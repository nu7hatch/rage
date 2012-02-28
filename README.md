# Rage against the browsers!

Because Fuuuuuuuuu is not enough, we need to force people to browser updates
and enjoy all the new features of HTML5!

## Usage

Add [Modernizr](http://github.com/Modernizr/Modernizr) and Rage scripts to
your HTML code and specify your requirements.  

    <script src="/js/libs/modernizr-2.0.6.min.js"></script>
    <script src="/js/libs/rage.js"></script>
    <script>
      Rage.requiredNavigators = {Safari: "532.1", Firefox: "3.1", Opera: "8.0};
      Rage.requiredFeatures = ["canvas"];
      Rage.validate();
    </script>
