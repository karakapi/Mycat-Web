$(function($) {
	//加载变量列表
	fnLoadVariables("");
});
//加载变量列表
var fnLoadVariables = function(filter) {
	var serverId = window.localStorage.getItem("currentServerId");
	var ajaxUrl = ajaxHost + "agent/mysql/" + serverId + "/globalVariables?filter=" + filter;
	$.getJSON(ajaxUrl, function(json) {
		if(json.code == "200") {
			$("#tbody_variables").empty();
			var data = json.data;
			$.each(data, function(index, value) {
				var html = "";
				html += "<tr>";
				html += "<td>" + value.Variable_name + "</td>";
				html += "<td>" + value.Value + "</td>";
				html += "<td><a class=\"btn btn-success btn-editone btn-xs\" href=\"javascript:fnEditVariables('" + value.Variable_name + "','" + value.Value + "')\"><i class=\"fa fa-pencil\"></i></a></td>";
				html += "</tr>";
				$("#tbody_variables").append(html);
			});
		}
	});
}
//通过过滤条件查询变量
$("#input_variables").keyup(function() {
	var filter = $("#input_variables").val();
	fnLoadVariables(filter);
});
//编辑变量
var fnEditVariables = function(variableName, variableValue) {
	var serverId = window.localStorage.getItem("currentServerId");
	bootbox.setLocale("zh_CN");
	bootbox.prompt({
		title: "编辑变量：" + variableName,
		inputType: 'text',
		value: variableValue,
		callback: function(result) {
			if(result == null) {
				return;
			} else {
				var ajaxUrl = ajaxHost + "agent/mysql/" + serverId + "/globalVariables/" + variableName + "/" + result + "/";
				$.getJSON(ajaxUrl, function(json) {
					if(json.code == "200") {
						var filter = $("#input_variables").val();
						fnLoadVariables(filter);
					} else {
						bootbox.alert(json.message);
					}
				});
			}
		}
	});
}