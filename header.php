<!doctype html>
<html>
  <head>
    <title>We Don't Make Demands
    <? if (isset($title)) { 
      echo " :: " . $title;
    }
    ?></title>
    <meta name="description" content="We Don't Make Demands: Suggestions for real reforms to US and international banking, political, and environmental practices."> 
    <meta name="description" content="occupy,occupy wall street,demands,suggestions,posters"> 
    <meta property="og:site_name" content="We Don't Make Demands"/>
	  <meta property="og:image" content="http://wedontmakedemands.org/images/poster-kiss.jpg"/>
    <meta property="og:description" content="We Don't Make Demands: Suggestions for real reforms to US and international banking, political, and environmental practices."/>
    <link rel="stylesheet" type="text/css" href="main.css">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		$('#nav li.donate').click(function() {
			$('#nav_donate').submit();
		});	
	});
	</script>
	<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-11129954-4']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

  </head>
  <body>
    <div id="page">
    <div id="header">
      <a href="/"><img src="images/wedontmakedemands.png" alt="We Don't Make Demands" class="head"></a>
      <ul id="nav">
        <li><a href="about.php">About</a></li>
        <li><a href="posters.php">Posters</a></li>
        <li><a href="gallery.php">Gallery</a></li>
        <li class="donate">
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" id="nav_donate">
<input type="hidden" name="cmd" value="_donations">
<input type="hidden" name="business" value="nicoletbn@gmail.com">
<input type="hidden" name="lc" value="US">
<input type="hidden" name="item_name" value="We Don't Make Demands">
<input type="hidden" name="no_note" value="0">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest">
Donate
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
</li>
        <li><a href="mailto:media@wedontmakedemands.org" title="media@wedontmakedemands.org">Contact Us</a></li>
        <li><a href="create.php#m=Bring%20back%20the%20GLASS-STEAGALL%20act&l=Glass-Steagall&e=t">Create</a></li>
      </ul>
    </div><!-- end header -->
    <div id="current">
      <? if (!$hideDonateSidebar) {?>
      <div id="sidebar">
            <!--Donation content goes here-->
		<img src="images/donate.png" alt="Donate" class="donate">
            <p class="first">Help us get the message out.<br>Printing is <strong>expensive.</strong></p>
	    <p>Currently we can accept Paypal donations.</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" id="btn_paypal">
<input type="hidden" name="cmd" value="_donations">
<input type="hidden" name="business" value="nicoletbn@gmail.com">
<input type="hidden" name="lc" value="US">
<input type="hidden" name="item_name" value="We Don't Make Demands">
<input type="hidden" name="no_note" value="0">
<input type="hidden" name="currency_code" value="USD">
<input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" id="button_paypal">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
			<p>Any amount is accepted. Current pricing for beautiful red-and-black prints on card stock produced by a local NYC printer is USD $2 each.</p>
			<p>If you would like to donate printing or other services, please contact:<br>
			<a href="mailto:help@wedontmakedemands.org?Subject=I want to help!">help@wedontmakedemands.org</a></p>      
		</div>
      <? } ?>
      <div id="main"><!--Main continues here-->
