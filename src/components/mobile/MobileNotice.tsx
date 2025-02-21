import React from 'react';

const MobileNotice = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-between p-8 bg-surface-background">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <img src="/hcc.png" alt="HCC Logo" className="w-8 h-8" />
        <button className="px-4 py-2 bg-fill-secondary rounded-md text-text-primary">Contact</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-xl font-medium text-text-primary mb-4">
          <a href="https://humanchemical.com" className="text-text-primary hover:text-text-secondary"><u>Human Chemical Co.</u></a> builds<br />
          AI tools for the development<br />
          of safe chemicals
        </h1>
        
        {/* Placeholder for demo video - replace src with actual video */}
        <div className="w-full max-w-2xl aspect-video bg-fill-secondary rounded-lg my-12">
          {/* <video 
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
            loop
          >
            <source src="/placeholder-demo.mp4" type="video/mp4" />
          </video> */}
        </div>

        <p className="text-lg text-text-secondary">
          Only available on Desktop
        </p>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-between text-sm text-text-secondary">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
    </div>
  );
};

export default MobileNotice; 