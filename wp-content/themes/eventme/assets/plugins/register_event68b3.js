'use strict';
jQuery(document).ready(function($){
    
    $('.af-form').each(function(index){
        $(this).find('label.error').hide();
    });    

    $('.af-form .text-input').css({backgroundColor:"#FFFFFF"});
    $('.af-form .text-input').focus(function () {
        $(this).css({backgroundColor:"#FCFCFC"});
    });
    $('.af-form .text-input').blur(function () {
        $(this).css({backgroundColor:"#FFFFFF"});
    });    

    $('.button_register').click(function () {        
        // first hide any error messages
        $('.af-form .error').hide();

        // validate and process form
        var idslide = '.af-form'+$(this).data('idslide');
        
        var name = $(idslide + " input.name-rf").val();
        if (name == "") {
            $(idslide + " label.name_error_rf").show();
            $(idslide + " input.name-rf").focus();
            return false;
        }
        var email = $(idslide + " input.email-rf").val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;

        if (!filter.test(email)) {
            $(idslide + " label.email_error_rf").show();
            $(idslide + " input.email-rf").focus();
            return false;
        }

        var phone = $(idslide + " input.phone-rf").val();
        if(phone == ''){
            phone = '0';
        }

        var message = $(idslide + " .message-rf").val();
        if (message == "") {
            $(idslide + " label.message_error_rf").show();
            $(idslide + " .message_error_rf").focus();
            return false;
        }

        var event_title = $(idslide + " input.event_title").val();

        var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&message=' + message;
        var data={
            name: name,
            email: email,
            phone: phone,
            message: message,
            event_title: event_title
        }
        //alert (dataString);return false;
        var registraton = $(idslide + " input.registraton").val();
        var mes_success = $(idslide + " input.mes_success").val();
        var mes_error = $(idslide + " input.mes_error").val();        
        

        $("button.button_register").prop("disabled",true);        
        $(idslide).find('.event_loading').addClass('show');

        $.post(ajax_object.ajaxurl, {
            action: 'ajax_action',
            data: data
        }, function(reponse) {
            if(reponse == 'true'){
                $(idslide).prepend("<div class=\"col-sm-12 \"><div class=\"alert alert-success fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button>"+mes_success+"</div></div><div style='clear:both'></div>");
                $(idslide + " input.name-rf").val('');
                $(idslide + ' .message-rf').val('');                
                $(idslide + " input.email-rf").val('');
                $(idslide + " input.phone-rf").val('');    
                $("button.button_register").prop("disabled",false);
                $(idslide).find('.event_loading').removeClass('show');
            }else{
                $(idslide).prepend("<div class=\"col-sm-12 \"><div class=\"alert alert-warning fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button>"+mes_error+"</div></div><div style='clear:both'></div>");                
                $("button.button_register").prop("disabled",false);
                $(idslide).find('.event_loading').removeClass('show');
            }
        }
        );
       
        return false;
    });

})