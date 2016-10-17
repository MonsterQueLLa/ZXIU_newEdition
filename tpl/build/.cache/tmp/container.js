/*TMODJS:{"version":1,"md5":"d82a27e003c7f6eca8357abb3f365ffa"}*/
template('tmp/container',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,length=$data.length,prdList=$data.prdList,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$out='';$out+='<ul> <li>';
$out+=$escape(length);
$out+='</li> ';
if(prdList.length>0){
$out+=' ';
$each(prdList,function($value,$index){
$out+=' <li> <img src="';
$out+=$escape($value.imgUrl);
$out+='" alt=""> <div>名称: ';
$out+=$escape($value.name);
$out+='</div> <div>价格: ';
$out+=$escape($value.pric);
$out+='</div> <div>数量: ';
$out+=$escape($value.num);
$out+='</div> </li> ';
});
$out+=' ';
}
$out+=' </ul> ';
return new String($out);
});