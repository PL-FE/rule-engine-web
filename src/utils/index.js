export function getAssetsImages (name) {
    return new URL(`/src/assets/images/${name}`, import.meta.url).href
}
