
export const API_URL = "http://localhost:9000";
export const LIGHT = 'light'
export const DARK = 'dark'

export function formatName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate(milliseconds) {
    // Create a new Date object based on the provided milliseconds
    const date = new Date(milliseconds);

    // Extract individual components of the date
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Ensure minutes are two digits
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${hours}:${minutes} ${ampm}`;

    return formattedDate;
}

export const BUBBLE_TYPES = ['bubble-text', 'bubble-image', 'bubble-gif']
export const USER_INPUT = ['user-input-text', 'user-input-number', 'user-input-email', 'user-input-phone', 'user-input-date', 'user-input-rating', 'user-input-button']
