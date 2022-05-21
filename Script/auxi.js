function linear_interpolation(A, B, t) {
    return A+(B-A)*t
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:linear_interpolation(A.x,B.x,t),
                y:linear_interpolation(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

//Working
function polyIntersect(p1,p2){
    for (let i = 0; i < p1.length - 1; i++) {
        for (let j = 0; j < p2.length - 1; j++) {
            const touch = getIntersection(
                p1[i],
                p1[i+1],
                p2[j],
                p2[j+1]
            );
            
            if (touch) {
                return true;
            }                
        }       
    }
    return false;
}