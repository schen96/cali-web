import {get} from "svelte/store";
import {alerts, id} from "$lib/stores";

/**
 * Alert object type
 * @typedef {Object} Alert
 * @property {Number} id
 * @property {String} title
 * @property {Number} type
 * @property {String} message
 * @property {Number} timeout
 */

console.log("IMPORTED THIS MODULE alertController.js")

// will always increase
let alertId = 0;

export const AlertType = {
    ALERT_TYPE_INFO: 0,
    ALERT_TYPE_ERROR: 1,
}


id.subscribe((n) => {
    alertId = n;
})


/**
 * Creates an alert
 *
 * @param type {Number}
 * @param message {String}
 * @param title {String}
 * @param timeoutMs {Number}
 * @returns {Alert}
 */
function makeAlert(type, message, title, timeoutMs=5000) {
    id.update((n) => n + 1)
    return {
        id: alertId,
        title: title,
        type: type,
        message: message,
        timeout: timeoutMs,
    }
}

/**
 * Creates an info alert
 *
 * @param title {string}
 * @param message {string}
 * @param timeoutMs {number}
 * @returns {Alert}
 */
export function makeInfoAlert(title, message, timeoutMs = 5000) {
    return makeAlert(AlertType.ALERT_TYPE_INFO, message, title, timeoutMs);
}

/**
 * Creates an error alert
 *
 * @param title {string}
 * @param message {string}
 * @param timeoutMs {number}
 * @returns {Alert}
 */
export function makeErrorAlert(title, message, timeoutMs = 5000) {
    return makeAlert(AlertType.ALERT_TYPE_ERROR, message, title, timeoutMs);
}


/**
 * Adds an alert to alerts
 *
 * @param alert {Alert}
 */
export function pushAlert(alert) {
    alerts.update((items) => {
        return [...items, alert]
    })
    if (alert.timeout >= 0) {
        setTimeout(() => {
            cancelAlert(alert)
        }, alert.timeout)
    }
}

/**
 * Cancels an alert
 *
 * @param alert {Alert}
 */
export function cancelAlert(alert) {
    alerts.update(items => {
        return items.filter(o => o.id !== alert.id)
    })
}

export default {makeInfoAlert, makeErrorAlert, pushAlert, cancelAlert};