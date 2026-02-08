const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const path = require('path');
const config = getDefaultConfig(__dirname);

// Force absolute paths to be resolved correctly on Windows
const projectRoot = path.resolve(__dirname);
config.projectRoot = projectRoot;
config.watchFolders = [projectRoot];

// Add CSS support for web
config.resolver.sourceExts.push('css');

// Enable symlinks for pnpm on Windows
config.resolver.unstable_enableSymlinks = true;

// ✅ NUEVO: Agregar soporte para workers y import.meta
config.transformer = {
    ...config.transformer,
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: true,
            inlineRequires: true,
        },
    }),
};

// ✅ NUEVO: Asegurar que los assets de fuentes se manejen correctamente
config.resolver.assetExts = [
    ...config.resolver.assetExts,
    'ttf',
    'otf',
    'woff',
    'woff2',
    'svg', // Added for icons
    'png',
    'jpg',
];

const isProduction = process.env.NODE_ENV === "production";

module.exports = withNativeWind(config, {
    input: "./global.css",
    // Disable forceWriteFileSystem in production to avoid SHA-1/Cache issues in CI
    forceWriteFileSystem: !isProduction,
});
