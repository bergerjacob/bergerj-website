// function updateBoxShadow() {
//     const elem = document.querySelector('.contact-container'); // Change to your element's class or ID
//     let degree = 0;

//     // Function to change the box shadow position
//     function rotateShadow() {
//         const x = Math.sin(degree * Math.PI / 180) * 10; // X offset
//         const y = Math.cos(degree * Math.PI / 180) * 10; // Y offset
//         const blur = 20; // Blur radius
//         const spread = 1; // Spread radius
//         const color = 'rgba(0, 0, 0, 0.3)'; // Shadow color

//         // Apply the box shadow style
//         elem.style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
        
//         // Increment the degree to keep the shadow moving
//         degree = (degree + 2) % 360;

//         // Continue the rotation
//         requestAnimationFrame(rotateShadow);
//     }

//     // Start the rotation
//     rotateShadow();
// }
// window.addEventListener('DOMContentLoaded', updateBoxShadow);

function updateContainer3D() {
    const elem = document.querySelector('.contact-container'); // Change to your element's class or ID
    let degree = 0;

    // Function to rotate the container in a 3D space and update the shadow
    function rotate3D() {
        // Calculate rotation values for X and Y axes for more natural movement
        const rotateX = Math.sin(degree * Math.PI / 180) * 5; // X-axis rotation
        const rotateY = Math.cos(degree * Math.PI / 180) * 5; // Y-axis rotation

        // Apply the 3D rotation to the container
        elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Calculate box shadow based on rotation
        const shadowX = -rotateY * 1.5; // Shadow moves opposite to Y rotation
        const shadowY = rotateX * 1.5;  // Shadow moves opposite to X rotation
        const blur = 20; // Blur radius
        const spread = 1; // Spread radius
        const color = 'rgba(0, 0, 0, 0.5)'; // Shadow color, adjust opacity as needed

        // Apply the dynamic box shadow
        elem.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px ${spread}px ${color}`;

        // Increment the degree to keep the rotation going
        degree = (degree + 1) % 360;

        // Continue the rotation
        requestAnimationFrame(rotate3D);
    }

    // Start the rotation
    rotate3D();
}
window.addEventListener('DOMContentLoaded', updateContainer3D);
