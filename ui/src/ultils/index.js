import { formatDistanceToNow } from "date-fns"

export const timeAgo = (timestamp) => {
    let result = '';
    if(timestamp){
        const date = new Date(timestamp);
        const timePeriod = formatDistanceToNow(date);
        result = `${timePeriod} ago`;
    }

    return result;
}