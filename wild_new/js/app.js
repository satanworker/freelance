/**
 * Created by mini on 18.02.16.
 */
$(document).ready(function(){
    $(".title span").typed({
        strings: ["разработка интернет приложений  <br /> и маркетинговых решений "],
        typeSpeed: 20,  callback: function() {
            $('.typed-cursor').hide();
            setTimeout(function(){
                $('.underline_container').addClass('active');
            }, 300)
        },
    });
});
