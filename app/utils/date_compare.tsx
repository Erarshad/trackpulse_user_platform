export function onlyDate(date?: string) {
    if (date != null) {
        const d= new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;

    } else {
        const d= new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }

}