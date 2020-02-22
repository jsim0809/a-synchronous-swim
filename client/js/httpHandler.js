
(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  var swimCommandFetcher = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      data: 'refresh',
      success: (data) => {
        SwimTeam.move(data);
      }
    });
  }

  var backgroundImageFetcher = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      data: 'yo bi please',
      success: (data) => {
        $('.pool').css('background-image', `url(data:image/jpg;base64,${data})`);
        // $('.pool').css('background', `blue`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        console.log('sent successfully');
        backgroundImageFetcher();
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

  backgroundImageFetcher();
  setInterval(swimCommandFetcher, 100);


})();
