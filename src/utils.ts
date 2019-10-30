export const toHue = (str: string) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return hash % 360;
};

export const escapeHTMLEncode = (str: string) => {
    const div = document.createElement('div');
    const text = document.createTextNode(str);

    div.appendChild(text);

    return div.innerHTML;
};
