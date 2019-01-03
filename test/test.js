function mosicJs(){


var x = 1;
var y = 1;
var selected=[];


for(var i=1; i <780; i++){
var div = document.createElement("div");
    div.setAttribute("class", "mosic-part");
    div.onclick= function(e){

    if(selected.length ==0){
        selected.push({x: e.currentTarget.getAttribute("x"), y: e.currentTarget.getAttribute("y") });
	}else if(selected.length==1){
        selected.push({x: e.currentTarget.getAttribute("x"), y: e.currentTarget.getAttribute("y") });

       [].forEach.call($('.mosic-part'), function(e){

            var x_value= $(e).attr("x");
            var y_value= $(e).attr("y");
            var r_value= Math.floor( Math.random() * 7 );

    if(x_value> (selected[0].x -1) && x_value<(selected[1].x+1)){


            if(y_value> (selected[0].y-1) && y_value<(selected[1].y+1)){
              if((x_value+y_value+r_value)%2==0){
                 e.setAttribute('class', 'mosic-part selected-odd');
             }else{
               e.setAttribute('class', 'mosic-part selected-even');
			     }


            }
         });

         selected=[];
	}
     console.log(selected);
    }

 console.log(i);
if(x==31){
 x=1;
 y++;

}else{

 div.setAttribute('x', x);
 div.setAttribute('y', y);
 x++;
 $('.mosic-body').append(div);
}


}
}
