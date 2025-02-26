#!/bin/bash

# Define the directory
DIRECTORY="public/leetcode-company-wise-problems"

# Output file
OUTPUT_FILE="folders.js"

# Start the JavaScript array
echo "const folders = [" > $OUTPUT_FILE

# Loop through each directory and append to the output file
for folder in "$DIRECTORY"/*/; do
  # Get the folder name without the path
  folder_name=$(basename "$folder")
  echo "  '$folder_name'," >> $OUTPUT_FILE
done

# Remove the last comma and close the array
sed -i '$ s/,$//' $OUTPUT_FILE
echo "];" >> $OUTPUT_FILE

# Print a message indicating completion
echo "Folder names have been saved to $OUTPUT_FILE"
