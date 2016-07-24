function game(){
	this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.speed=5;
	this.width=document.documentElement.clientWidth;
	this.height=document.documentElement.clientHeight;
	this.letterLength=4;
	this.span=[];
	this.randarr=[];
	window.that=this;
	this.stepEle=document.getElementsByClassName('step')[0].getElementsByTagName('span')[0];
	this.lifeEle=document.getElementsByClassName('life')[0].getElementsByTagName('span')[0];
	this.scoreEle=document.getElementsByClassName('score')[0].getElementsByTagName('span')[0];
	this.score=0;
	this.life=10;
	this.step=1;
	this.t=0;
	this.current=0;
	this.amount=10;
	this.next=document.getElementsByClassName('next')[0];
	this.over=document.getElementsByClassName('over')[0];
	this.play();
}

game.prototype={
	play:function(){
		// alert(this.random1(this.letterLength))
		this.createEle(this.letterLength);
		this.move();
		this.key();
	},
	key:function(){
		var that=this;
		document.onkeydown=function(e){
			var ev=e||window.event;
			var l=String.fromCharCode(ev.keyCode);
			for(var i=0;i<that.span.length;i++){
				if(that.span[i].innerHTML==l){
					that.span[i].style.display="none";
					that.span.splice(i,1);
					that.randarr.splice(i,1);
					that.createEle(1);
					var num=++that.score;
					var current=++that.current;
					if (current%that.amount==0){
						that.scoreEle.innerHTML=num;
	 				    that.next.style.display="block";
	 				    clearInterval(that.t);
	 				    setTimeout(function(){
	 				    	that.again();
	 				    	that.next.style.display="none";
	 				    },3000)
	 				    
	 				    // alert("恭喜你进入下一关！")
						
					}
					that.scoreEle.innerHTML=num;
					break;
				}
			}
		}
	},
	again:function(){
		var that=this;
        clearInterval(that.t);
        for (var i = 0; i <that.span.length; i++) {
  	        that.span[i].style.display="none"
        }
        that.span=[];
        that.randarr=[];
        that.stepEle.innerHTML=++that.step;
        that.letterLength++;
        that.speed++;
        that.current=0;
        that.amount+=5;
        that.createEle(that.letterLength);
        that.move();
		that.key();
	},
	move:function(){
		var that=this;
		that.t=setInterval(that.move2,60)
	},
	move2:function(){
		for(var i=0;i<that.span.length;i++){
		var tops=that.span[i].offsetTop+that.speed;
		that.span[i].style.top=tops+"px";
		if(tops>that.height-230){
		that.span[i].style.display="none";
		that.span.splice(i,1);
		that.randarr.splice(i,1);
		that.createEle(1);
		var num=--that.life;
	    that.lifeEle.innerHTML=num;
		if (num<=0) {
		   that.over.style.display="block";
		   clearInterval(that.t);
		   // alert("GAME OVER!")
		   setTimeout(function(){
	 		  location.reload();
	 		  that.next.style.display="none";
	 	   },3000)
		   
		};
		break;
	    }
		}
	},
	createEle:function(num){
		var arr=this.random(num);
		for(var i=0;i<arr.length;i++){
			var div=document.createElement('div');
			div.style.cssText="width:150px;height:150px;position:absolute;left:"+(this.width-200)*Math.random()+50+"px;top:"+((-100)+(-100)*Math.random())+"px;color:rgba(0,0,0,0);font-size:60px;font-weight:bold;background-image:url(images/"+arr[i]+".png);background-size:150px 150px";
			div.innerHTML=arr[i];
			document.body.appendChild(div);
			this.span.push(div);
		}
	},
	random:function(num){
		var arr=[];
		for(var i=0;i<num;i++){
			var rand=Math.floor(Math.random()*this.letterArr.length);
			while(this.check(this.randarr,this.letterArr[rand])){
				rand=Math.floor(Math.random()*this.letterArr.length);
			}
			arr.push(this.letterArr[rand]);
			this.randarr.push(this.letterArr[rand]);
		}
		return arr;
	},
	check:function(arr,val){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==val){
				return true;
			}
		}
		return false;
	}
}