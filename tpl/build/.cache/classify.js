/*TMODJS:{"version":3,"md5":"4c387b8b27fc217db7c229a3b2a72c9a"}*/
template('classify',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./tmp/classify');
$out+=' ';
include('./tmp/footer');
return new String($out);
});