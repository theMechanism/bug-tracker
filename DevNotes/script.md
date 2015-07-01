This is the script to generate the bug tracker iframe:
<!--
<script type="text/javascript">
        setTimeout(
            function(){
                var a = document.createElement("script");
                var b = document.getElementsByTagName("script")[0];
                a.src = "http://venus.themechanism.com/mech-bug-tracker.js?projectID=2";
                a.async = true;
                a.type = "text/javascript";
                b.parentNode.insertBefore(a,b)
        }, 1);
</script>
 -->
