cd src/etc
rm appConstants.json
cp appConstants-qlt.json appConstants.json
cd ../..
npm run build
cd src/etc
rm appConstants.json
cp appConstants-dev.json appConstants.json
cd ../..
