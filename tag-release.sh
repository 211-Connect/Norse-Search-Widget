#!/bin/bash

# Extract the version from package.json
VERSION=$(node -p "require('./package.json').version")

if [ -z "$VERSION" ]; then
  echo "Error: Could not extract version from package.json"
  exit 1
fi

TAG_NAME="v$VERSION"

echo "Creating tag $TAG_NAME..."
git tag "$TAG_NAME"

echo "Pushing tag $TAG_NAME to origin..."
git push origin "$TAG_NAME"

echo "Successfully tagged and pushed $TAG_NAME"