from PIL import Image

im = Image.open(r'C:/Users/prasa/.gemini/antigravity/brain/4f0ddc47-528b-4e61-9c4e-b31542ade303/.user_uploaded/media_1794833263044_eb29840b.png')

# Let's check column 253 from y=100 to y=450
pixels = [im.getpixel((253, y)) for y in range(100, 450, 20)]
print('Pixels at column 253:', pixels)
