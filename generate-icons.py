#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont
import os

def create_rounded_rectangle_mask(size, radius):
    """Create a mask for rounded rectangle"""
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), size], radius=radius, fill=255)
    return mask

def create_gradient(size, color1, color2):
    """Create a diagonal gradient from bottom-left to top-right"""
    base = Image.new('RGB', size, color1)
    top = Image.new('RGB', size, color2)
    mask = Image.new('L', size)
    mask_data = []
    for y in range(size[1]):
        for x in range(size[0]):
            # Diagonal gradient from bottom-left (0,height) to top-right (width,0)
            # Calculate distance from bottom-left corner
            distance = ((x + (size[1] - y)) / (size[0] + size[1]))
            mask_data.append(int(255 * distance))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def generate_icon(size):
    # Colors
    light_green = (126, 217, 87)   # #7ED957
    yellow = (255, 215, 0)          # #FFD700
    black = (0, 0, 0)

    # Create gradient background
    img = create_gradient((size, size), light_green, yellow)

    # Apply rounded corners
    radius = int(size * 0.1875)  # 24/128 ratio
    mask = create_rounded_rectangle_mask((size, size), radius)

    # Create final image with alpha channel
    final = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    final.paste(img, (0, 0), mask)

    # Add text
    draw = ImageDraw.Draw(final)

    # Try to use a Japanese font, fallback to default
    font_size = int(size * 0.625)  # 80/128 ratio
    font = None

    font_paths = [
        # Linux fonts (verified to exist)
        '/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf',
        '/usr/share/fonts/truetype/fonts-japanese-gothic.ttf',
        '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc',
        # Other common locations
        '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
        '/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc',
        '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc',
        '/System/Library/Fonts/Hiragino Sans GB.ttc',
        'C:\\Windows\\Fonts\\msgothic.ttc',
    ]

    for font_path in font_paths:
        try:
            if os.path.exists(font_path):
                font = ImageFont.truetype(font_path, font_size)
                print(f'  Using font: {font_path}')
                break
        except Exception as e:
            print(f'  Failed to load {font_path}: {e}')
            continue

    if font is None:
        raise Exception('No suitable Japanese font found! Please install IPA Gothic or Noto Sans CJK fonts.')

    # Draw the character 文
    text = '文'

    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Position text in center (slightly adjusted down)
    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1] + int(size * 0.05)

    draw.text((x, y), text, font=font, fill=black)

    return final

def main():
    sizes = [16, 48, 128]
    output_dir = 'src/icons'

    os.makedirs(output_dir, exist_ok=True)

    for size in sizes:
        print(f'Generating icon{size}.png...')
        icon = generate_icon(size)
        output_path = os.path.join(output_dir, f'icon{size}.png')
        icon.save(output_path, 'PNG')
        print(f'✓ Generated {output_path}')

    print('\n✓ All icons generated successfully!')

if __name__ == '__main__':
    main()
