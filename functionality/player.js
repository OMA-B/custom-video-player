// grabbing elements for use
const video = document.querySelector('.video');
const play_icon = document.querySelector('#play-icon');
const volume_range = document.querySelector('.volume-range');
const volume_icon = document.querySelector('#volume-icon');
const progress_range = document.querySelector('.progress-range');
const time_stamps = document.querySelectorAll('.time-stamp span');
const speed_options = document.querySelectorAll('.playback-speed option');
const fullscreen_icon = document.querySelector('#fullscreen-icon');

// play and pause video
let play = false;

// reseting play button when video ends or is paused
const reset = () => {
    play_icon.classList.replace('fa-pause', 'fa-play');
    play_icon.setAttribute('title', 'Play');
    play = false;
}

const toggle_play = () => {
    if (!play) {
        video.play();
        play_icon.classList.replace('fa-play', 'fa-pause');
        play_icon.setAttribute('title', 'Pause');
        play = true;
    } else {
        video.pause();
        reset();
    }
}

// to adjust or change volume of video
let volume_amount = 1;

const change_volume_icon = () => {
    volume_range.children[0].style.width = `${(volume_amount) * 100}%`;
    volume_icon.classList = 'fa-solid';
    if (volume_amount < 0.75 && volume_amount > 0.25) {
        volume_icon.classList.add('fa-volume-low');
    } else if (volume_amount < 0.25) {
        volume_icon.classList.add('fa-volume-off');   
    } else {
        volume_icon.classList.add('fa-volume-high');
    }
}

const adjust_volume = (e) => {
    volume_amount = e.offsetX / e.target.offsetWidth;
    video.volume = volume_amount;
    change_volume_icon();
    // just incase video was muted
    video.muted = false;
}

// to mute and unmute video
let mute = false;

const toggle_mute = () => {
    if (!mute) {
        video.muted = true;
        volume_range.children[0].style.width = `0%`;
        volume_icon.classList = 'fa-solid';
        volume_icon.classList.add('fa-volume-xmark');
        mute = true;
    } else {
        video.muted = false;
        change_volume_icon();
        mute = false;
    }
}

// to set progress bar and update time stamp
const time_update = (current_time, duration) => {
    // dynamically populating progress bar width with current time
    progress_range.children[0].style.width = `${(current_time / duration) * 100}%`;
    // deriving duration value to populate in the DOM
    let duration_min = Math.floor(duration / 60);
    // for when duration minute is less than 10, add 0 before it
    if (duration_min < 10) duration_min = `0${duration_min}`;

    let duration_sec = Math.floor(duration % 60);
    // for when duration second is less than 10, add 0 before it
    if (duration_sec < 10) duration_sec = `0${duration_sec}`;
    // deriving current time value to populate in the DOM
    let current_time_min = Math.floor(current_time / 60);
    // for when current time minute is less than 10, add 0 before it
    if (current_time_min < 10) current_time_min = `0${current_time_min}`;

    let current_time_sec = Math.floor(current_time % 60);
    // for when current time second is less than 10, add 0 before it
    if (current_time_sec < 10) current_time_sec = `0${current_time_sec}`;
    // populating computed time in the DOM
    time_stamps[0].textContent = `${current_time_min}:${current_time_sec} /`;
    // to prevent time stamp from displaying NaN
    if (duration_min) time_stamps[1].textContent = `${duration_min}:${duration_sec}`;
}

// global changable variables for current_time and duration
let current_time;
let duration;

const set_progress = (e) => {
    // fetching video's current time and duration
    current_time = e.target.currentTime;
    duration = e.target.duration;
    // setting progress bar and update time stamp dynamically
    time_update(current_time, duration);
}

// to allow user be able to skip to any part of the video
const seek = (e) => {
    // deriving how much time skipped
    const progress_amount = e.offsetX / e.target.offsetWidth;
    current_time = progress_amount * duration;
    // letting video playback time be what user skipped to
    video.currentTime = current_time;
    // setting progress bar and update time stamp dynamically
    time_update(current_time, duration);
}

// adjusting playback speed
speed_options.forEach(option => {
    // adding Event Listener to each option
    option.addEventListener('click', () => {
        // let video play at rate of option picked
        video.playbackRate = option.value;
        // let background of initially picked option resolve to default
        speed_options.forEach(option_bg => { if (option_bg.style.background = 'var(--primary-color)') option_bg.style.background = 'transparent'; });
        // let the newly selected option now have a different background
        option.style.background = 'var(--primary-color)';
    });
});

// to switch in and out of fullscreen mode
let fullscreen = false;

const toggle_fullscreen = () => {
    if (!fullscreen) {
        video.parentElement.classList.add('fullscreened');
        progress_range.parentElement.parentElement.classList.add('fullscreen-panel');
        fullscreen_icon.classList.replace('fa-expand', 'fa-compress');
        fullscreen_icon.setAttribute('title', 'Exit Fullscreen');
        fullscreen = true;
    } else {
        video.parentElement.classList.remove('fullscreened');
        progress_range.parentElement.parentElement.classList.remove('fullscreen-panel');
        fullscreen_icon.classList.replace('fa-compress', 'fa-expand');
        fullscreen_icon.setAttribute('title', 'Go Fullscreen');
        fullscreen = false;
    }
}

// Event Listeners
play_icon.addEventListener('click', toggle_play);
video.addEventListener('click', toggle_play);
video.addEventListener('ended', reset);
volume_range.addEventListener('click', adjust_volume);
volume_icon.addEventListener('click', toggle_mute);
video.addEventListener('timeupdate', set_progress);
progress_range.addEventListener('click', seek);
fullscreen_icon.addEventListener('click', toggle_fullscreen);
// to toggle fullscreen on and off when user double click or tap on the video screen
video.addEventListener('dblclick', toggle_fullscreen);