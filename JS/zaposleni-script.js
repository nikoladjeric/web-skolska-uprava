const allProfiles = document.querySelectorAll('.person-info p:last-of-type');

allProfiles.forEach(profile => {
    profile.addEventListener('click', () => {
        console.log(profile.innerHTML);
        navigator.clipboard.writeText(profile.innerHTML);
    });
});