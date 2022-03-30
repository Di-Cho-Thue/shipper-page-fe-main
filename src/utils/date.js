export const getQuesDateString = (date) => {
    const time = (new Date() - new Date(date)) / 1000;
    if (time <= 120) return "Vừa xong";
    if (time < 3600) return `${Math.floor(time / 60)} phút trước`;
    if (time < 86400) return `${Math.floor(time / 3600)} giờ trước`;
    if (time < 864000) return `${Math.floor(time / 86400)} ngày trước`;
    return `Vào ${new Date(date).toLocaleString()}`;
};