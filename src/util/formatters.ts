export const customDateFormatter = {
    format(timestamp: string): string {
        const date = new Date(timestamp);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        return `${month} ${day} ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    }
};

export const capitalizeFirstWord = (text: string): string => {
  if (!text) return "";
  return text.replace(/^\s*\w/, (c) => c.toUpperCase());
};