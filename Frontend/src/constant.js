
export const API_URL = "http://localhost:9000";
export const LIGHT = 'light'
export const DARK = 'dark'

export function formatName(str) {
    console.log("🚀 ~ formatName ~ str:", str)
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const BUBBLE_TYPES = ['bubble-text', 'bubble-image', 'bubble-gif']
