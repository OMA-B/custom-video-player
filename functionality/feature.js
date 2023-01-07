// grabbing elements
const more_icon = document.querySelector('#more-icon');
const features_container = document.querySelector('.features-container');
const exit_btns = document.querySelectorAll('#cancel');
const user_guide = document.querySelector('.user-guide');
const playlist = document.querySelector('.playlist');
const back_btns = document.querySelectorAll('#back');
const video_clips = document.querySelectorAll('.list .video-clip');

// to hide more_icon after some time when window loads
setTimeout(() => { more_icon.parentElement.classList.remove('show-more-icon') }, 6000);

// make features container show up
const show_more_features = () => {
    features_container.classList.add('fade-in');
    if (play) video.pause();
}

// show user guide container
const show_user_guide = () => {
    features_container.children[0].hidden = true;
    features_container.children[1].hidden = false;
    features_container.children[2].hidden = true;
}

// show playlist container
const show_playlist = () => {
    features_container.children[0].hidden = true;
    features_container.children[1].hidden = true;
    features_container.children[2].hidden = false;
}

const exit_features_container = () => { 
    features_container.classList.remove('fade-in');
    features_container.children[0].hidden = false;
    features_container.children[1].hidden = true;
    features_container.children[2].hidden = true;
    if (play) video.play();
}

// Event Listeners
more_icon.addEventListener('click', show_more_features);
user_guide.addEventListener('click', show_user_guide);
playlist.addEventListener('click', show_playlist);
// Event Listener for when the features-container is clicked, to exit it
window.addEventListener('click', (e) => { if (e.target === features_container) exit_features_container(); });
// Event Listener to each Exit button
exit_btns.forEach(btn => { btn.addEventListener('click', exit_features_container); });
// Event Listener to go back to previous screen, more_container, when a Back button is clicked
back_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.hidden = true;
        features_container.children[0].hidden = false;
    })
});

// Event Listener to populate the video source with selected option from the playlist tab
let video_url;

video_clips.forEach(clip => {
   clip.addEventListener('click', () => {
      video_url = `assets/${clip.children[1].textContent}.mp4`;
      video.src = video_url;
      exit_features_container();
   })
});