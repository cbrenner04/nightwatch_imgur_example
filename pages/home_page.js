module.exports = {
  url: 'https://imgur.com',
  elements: {
    randomButton: '#random-button',
    uploadButton: '.upload-button',
    signInButton: '.signin-link'
  },
  sections: {
    searchContainer: {
      selector: '#global-search-container',
      elements: {
        searchIcon: '.icon-search',
        searchInput: 'input[type=text]'
      }
    },
    uploadModal: {
      selector: '#upload-modal',
      elements: {
        fileUploadInput: '#global-files-button'
      }
    }
  },
}
