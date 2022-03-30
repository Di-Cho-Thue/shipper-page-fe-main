import cookies from "js-cookie";

export function getUserFieldFromCookieOrLocalStorage(field) {
    if (typeof window === "undefined") return;
    const value = cookies.get(field);

    return value || window.localStorage.getItem(field);
}
export function setUserFieldToLocalStorage(field, value) {
    if (typeof window === "undefined") return;

    // Remove userData saved in cookie if any
    cookies.remove(field);

    // Save data to local storage instead of cookie
    window.localStorage.setItem(field, value);

}