/**
 * Created by xqy on 18/5/14.
 */
 $(function() {
     var datetimerange = $("#reservationtime");
     if (datetimerange && datetimerange.length > 0) {
 		//定义时间选择事件
 		datetimerange.daterangepicker({
 			timePicker: true,
 			timePickerIncrement: 1,
 			format: 'YYYY/MM/DD HH:mm:ss'
 		},
 		function (start, end, label) {
 			var tr = datetimerange.val();
 			//console.log('start', start, 'end', end, 'label', label);
 		});
 	}

     // MYCAT节点列表
     var mycatNodes = $('#dataNodes');
     // MYSQL节点列表
     var mysqlNodes = $('#nodeUl');
     // MYSQL节点信息
     var currentMysql = $('#defaultNode');
     var nodes = getNodes();
     // 获取所有mysql节点列表
     if(mysqlNodes && mysqlNodes.length>0) {
         getMysqlList(mysqlNodes,function(){
             var c = mysqlNodes.find('li').eq(0);
             if(nodes.curMysql!=''){
                 currentMysql.text(nodes['list']['mysql']['name']||'');
                 currentMysql.attr('data-value',nodes['list']['mysql']['value']||'');
             }else{
                 currentMysql.text(c.attr('data-name')||'暂无节点');
                 currentMysql.attr('data-value',c.attr('data-value')||'');
                 var n = nodes.list || {mysql: {name: '', value: ''}, mycat: {name: '', value: ''}};
                 n.mysql.name = c.attr('data-name')||'暂无节点';
                 n.mysql.value = c.attr('data-value')||'';
                 window.sessionStorage.setItem('nodes',JSON.stringify(n));
             }
         });
         mysqlNodes.on('click','li',function(e){
             var _this = $(this);
     		if(!_this.hasClass('active') && !_this.hasClass('disabled')){
                 var name = _this.attr('data-name');
                 var value = _this.attr('data-value');
                 currentMysql.text(name);
                 currentMysql.attr('data-value',value);
                 var n = nodes.list || {mysql: {name: '', value: ''}, mycat: {name: '', value: ''}};
                 n.mysql.name = name;
                 n.mysql.value = value;
                 window.sessionStorage.setItem('nodes',JSON.stringify(n));
             }
         });
     }
     // 获取所有mycat节点列表
     if (mycatNodes && mycatNodes.length>0) {
         getMycatList(mycatNodes,function(){
             mycatNodes.val(nodes.curMycat);
             doSearch();
         });
         mycatNodes.on('change', function (e) {
             var _this = $(this);
             //console.log($(this).val(),$(this).find(':selected').text());
             var n = nodes.list || {mysql: {name: '', value: ''}, mycat: {name: '', value: ''}};
             n.mycat.name = _this.find(':selected').text();
             n.mycat.value = _this.val();
             window.sessionStorage.setItem('nodes', JSON.stringify(n));
         });
     }

     // 绑定搜索按钮事件
     $('#btn-search').on('click', function (e) {
         var $btn = $(this).button('loading')
         var sid = $('#dataNodes').val();
         if (sid == '') {
             notifi.warn('请选择服务节点！');
             $btn.button('reset');
             return;
         }
         doSearch();
     });
     var table;
     function doSearch(server_id,btn){
         var sid = $('#dataNodes').val();
         var tr = $("#reservationtime").val();
         if (sid == '') {
             notifi.warn('请选择服务节点！');
             return;
         }
         if (table) {
             table.destroy();
         }
         table = $('#mycat-datanode').DataTable({
             'oLanguage': dtb.oLanguage,
             'ajax': '/mycat/datanode/list?server_id=' + sid,
             'columns':[
                 { 'data': 'name' },
                 { 'data': 'datahost' },
                 { 'data': 'dIndex' },
                 { 'data': 'dType' },
                 { 'data': 'dActive' },
                 { 'data': 'dIdle' },
                 { 'data': 'dSize' },
                 { 'data': 'dExecute' },
                 { 'data': 'totalTime' },
                 { 'data': 'maxTime' },
                 { 'data': 'maxSql' },
                 { 'data': 'recoveryTime' }
             ]
         });
         $('#btn-search').button('reset');
     }
 });
