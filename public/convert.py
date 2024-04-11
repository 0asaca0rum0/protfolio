from PIL import Image
import os

def convert_to_webp(input_image_path, output_image_path):
    im = Image.open(input_image_path)
    im.save(output_image_path, 'WEBP')

# Specify the directory containing the input images
input_dir = './'

# Iterate over all files in the input directory
for file_name in os.listdir(input_dir):
    if file_name.endswith('.jpg') or file_name.endswith('.jpeg') or file_name.endswith('.png'):
        input_image_path = os.path.join(input_dir, file_name)
        output_image_path = os.path.splitext(input_image_path)[0] + '.webp'
        convert_to_webp(input_image_path, output_image_path)
        print(f'Image converted to WebP: {output_image_path}')
