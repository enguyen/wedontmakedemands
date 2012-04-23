<?
  $title = "Create";
  $hideDonateSidebar = true;
  include('header.php');
?>
<script type="text/javascript" src="https://apis.google.com/js/client.js"></script>
<script type="text/javascript" src="create/create.js"></script>
<link rel="stylesheet" href="create/proximanovawebfont/stylesheet.css" type="text/css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="create/create.css" />
<script type="text/javascript">
  // Initialize.
  var posterMaker = new PosterMaker();
  $(document).ready(function() { posterMaker.onready(); });
  $(window).load(function() { posterMaker.onload(); });
</script>

<div id="poster">
  <div class="fixedtext header">
    We don't make <span class="down"> demands</span><br/>
    so <span> this </span> is a suggestion
  </div>
  <div class="message"></div>
  <div class="fixedtext footer">
    <span>Solutions.</span><br/>
    They're out there
  </div>
  <div class="linklabel1">Learn more</div>
  <div class="linklabel2">at Wikipedia</div>
  <a class="qrcode-link"><img class="qrcode" /></a>
</div>

<div id="share" class="rightpane">
  <h1>Share this poster</h1>
  <input class="short-link" type="text" />
  <div id="share-controls">
    <div class="addthis_toolbox addthis_default_style addthis_32x32_style">
      <a class="addthis_button_preferred_1"></a>
      <a class="addthis_button_preferred_2"></a>
      <a class="addthis_button_preferred_3"></a>
      <a class="addthis_button_preferred_4"></a>
      <a class="addthis_button_compact"></a>
    </div>
    <script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4f04a87632cb44b5"></script>
    <div id="share-controls-mask"></div>
  </div>
  
  <h1>Remix</h1>
  <button class="remix-button">Remix this poster</button>  
</div>

<div id="edit" class="rightpane" style="display:none;">
  <h1>Make your own</h1>
  <ol>
    <li>
      <div class="number">1.</div>
      Craft your message:
      <textarea class="message-input"></textarea>
      <div class="info" style="margin-bottom: 10px;">
        (<span class="red">UPPERCASE words are red</span>, lowercase words are black.)
      </div>
      <button class="larger-button" style="margin: 0 3px 0 0;">Larger</button> or
      <button class="smaller-button" style="margin: 0 3px;">Smaller</button> text.
    </li>
  
    <li>
      <div class="number">2.</div>
      Link to a Wikipedia article:
      <input class="link-input" type="text" />
      <iframe class="link-preview"></iframe>
    </li>
  
    <li>
      <div class="number">3.</div>
      <button class="share-button">Share it</button>
    </li>
  </ol>
</div>

<?
  include('footer.php');
?>