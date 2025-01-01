
export const API_URL = "http://localhost:9000";
export const LIGHT = 'light'
export const DARK = 'dark'

export function formatName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const BUBBLE_TYPES = ['bubble-text', 'bubble-image', 'bubble-gif'];

export const USER_INPUT = ['user-input-text', 'user-input-number', 'user-input-email', 'user-input-phone', 'user-input-date', 'user-input-rating', 'user-input-button']
