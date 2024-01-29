export function FormatPrice(price:number){
    return(price / 100).toLocaleString('en-us', {
        style:'currency',
        currency:'USD'
    })
}