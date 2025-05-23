const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cv = require('opencv4nodejs');
const sharp = require('sharp');
const app = express();
const port = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static('public'));
app.use('/sprites', express.static('sprites'));

// Function to detect Pokemon cards in the image
async function detectPokemonCards(imagePath) {
    const img = cv.imread(imagePath);
    const gray = img.cvtColor(cv.COLOR_BGR2GRAY);
    const blurred = gray.gaussianBlur(new cv.Size(5, 5), 0);
    const edges = blurred.canny(50, 150);
    
    // Find contours
    const contours = edges.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    
    // Filter contours by size and shape to find Pokemon cards
    const cards = contours
        .filter(contour => {
            const area = contour.area;
            const rect = contour.boundingRect();
            const aspectRatio = rect.width / rect.height;
            return area > 1000 && aspectRatio > 0.8 && aspectRatio < 1.2;
        })
        .map(contour => contour.boundingRect())
        .sort((a, b) => a.x - b.x); // Sort by x position

    return cards;
}

// Function to extract Pokemon sprite from a card
async function extractPokemonSprite(imagePath, cardRect) {
    const img = cv.imread(imagePath);
    const card = img.getRegion(cardRect);
    
    // Convert to grayscale and threshold to isolate the Pokemon sprite
    const gray = card.cvtColor(cv.COLOR_BGR2GRAY);
    const thresh = gray.threshold(0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
    
    // Find the largest contour (should be the Pokemon sprite)
    const contours = thresh.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    if (contours.length === 0) return null;
    
    const largestContour = contours.reduce((max, contour) => 
        contour.area > max.area ? contour : max
    );
    
    const spriteRect = largestContour.boundingRect();
    const sprite = card.getRegion(spriteRect);
    
    // Save the extracted sprite temporarily
    const tempPath = path.join('uploads', `sprite_${Date.now()}.png`);
    cv.imwrite(tempPath, sprite);
    
    return tempPath;
}

// Function to compare two images
async function compareImages(img1Path, img2Path) {
    const img1 = cv.imread(img1Path);
    const img2 = cv.imread(img2Path);
    
    // Resize images to same size for comparison
    const size = new cv.Size(100, 100);
    const resized1 = img1.resize(size);
    const resized2 = img2.resize(size);
    
    // Convert to grayscale
    const gray1 = resized1.cvtColor(cv.COLOR_BGR2GRAY);
    const gray2 = resized2.cvtColor(cv.COLOR_BGR2GRAY);
    
    // Calculate similarity using template matching
    const result = gray1.matchTemplate(gray2, cv.TM_CCOEFF_NORMED);
    const similarity = result.minMaxLoc().maxVal;
    
    return similarity;
}

// Endpoint to get list of sprites
app.get('/api/sprites', (req, res) => {
    const spritesDir = path.join(__dirname, 'sprites');
    fs.readdir(spritesDir, (err, files) => {
        if (err) {
            console.error('Error reading sprites directory:', err);
            return res.status(500).json({ error: 'Failed to read sprites directory' });
        }
        res.json(files);
    });
});

// Endpoint to process uploaded image
app.post('/api/process-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    try {
        // Detect Pokemon cards in the image
        const cards = await detectPokemonCards(req.file.path);
        
        // Process each card
        const results = [];
        for (const card of cards) {
            // Extract Pokemon sprite from the card
            const spritePath = await extractPokemonSprite(req.file.path, card);
            if (!spritePath) continue;
            
            // Compare with all sprites in the directory
            const spritesDir = path.join(__dirname, 'sprites');
            const spriteFiles = fs.readdirSync(spritesDir);
            
            let bestMatch = { name: '', similarity: 0 };
            for (const spriteFile of spriteFiles) {
                const spriteFilePath = path.join(spritesDir, spriteFile);
                const similarity = await compareImages(spritePath, spriteFilePath);
                
                if (similarity > bestMatch.similarity) {
                    bestMatch = {
                        name: path.parse(spriteFile).name,
                        similarity: similarity
                    };
                }
            }
            
            results.push(bestMatch);
            
            // Clean up temporary sprite file
            fs.unlinkSync(spritePath);
        }
        
        // Clean up uploaded file
        fs.unlinkSync(req.file.path);
        
        res.json({
            success: true,
            results: results
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 