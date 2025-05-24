import moment from 'moment'
import html2canvas from 'html2canvas'
export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function formatYearMonth(yearMonth){
    return yearMonth  ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : ""
}

export function fixTailwindColor(element) {
    const elements = element.querySelectorAll("*");
    elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        ["color", "backgroundColor", "borderColor"].forEach((prop) => {
            const value = style[prop];
            if (value.includes("oklch")) {
                el.style[prop] = "#000";
            }
        });
    });
}
export async function  captureElementAsImage(elemet){
    if(!elemet) throw new Error("No element Provided");

    const canvas = await html2canvas(elemet);
    return canvas.toDataURL("image/png");

}

export const dataURLtoFile = (dataURL, fileName)=>{
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8rr = new Uint8Array(n);

    while(n--){
        u8rr[n] = bstr.charCodeAt(n)

    }

    return new File([u8rr], fileName, {type:mime})
}

export async function blobUrlToFile(blobUrl, fileName = "profile.png") {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
}

