/**
 * Created by 31344 on 2016/2/12.
 */
$(document).ready(function () {
    /**
     * 提交答案处理
     */
    $("#questions").submit(function () {
        //获取所有答题结果
        var answers = [];
        var unAnswered = "";
        for(var i = 1; i <= 63; i++){
            var result = $("input[name='question"+i+"']:checked").val();
            if(result == null){
                unAnswered += i;
                unAnswered += " ";
            }
            answers.push(result|'');
        }
        //判断是否有未答的题目
        if(unAnswered != ""){
            $("#unAnswered").html(unAnswered);
            $("#failed_modal").modal();
            return false;
        }
        //显示测试结果
        showResult(answers);
        return false;
    });

    /**
     * 显示测试结果
     * @param answers
     */
    function showResult(answers){
        $.post("/functions/testResult",
            {answers:answers},
            function(data){
                if(data == null){
                    return;
                }
                $("#result").html(data.type);
                $("#result_modal").modal();
            }
        );
    }
});