export async function shareMovie({ title, text, url}){
    
    const shareData = {
        title : `Nonton ${title} di Chill!` || "Chill - Nonton Film Cinematic",
        text : text || `Nonton ${title} di Chill!`,
        url : url || window.location.href
    }

    if(navigator.share){
        try{
            await navigator.share(shareData);
            return {success : true, type : "native"};
        } catch(err) {
            if (err.name != "AbortError" ){
                console.error("Error Sharing :", err)
            }
            else{
                return {success : false, type : "canceled"};
            }
        }
    }else{
        try{
            await navigator.clipboard.writeText(shareData.url);
            return {success : true, type : "clipboard"};
        }catch(err){
            console.error("Gagal menyalin link :", err);
            return {success : false, type : "error"};
        }
    }

}