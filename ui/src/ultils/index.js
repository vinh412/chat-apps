import { formatDistanceToNow, parseISO } from "date-fns"

export const timeAgo = (timestamp) => {
    let result = '';
    if(timestamp){
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        result = `${timePeriod} ago`;
    }

    return result;
}