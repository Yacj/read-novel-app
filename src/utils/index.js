export const baseUrL = {
    api: '',
    img: 'http://statics.zhuishushenqi.com',
    page: 'http://chapterup.zhuishushenqi.com'
}

export function uuid() {
    return URL.createObjectURL(new Blob()).substr(-10)
}