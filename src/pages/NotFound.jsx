import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Matter from 'matter-js';

const NotFound = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    // Setup Engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Setup Render
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      }
    });
    renderRef.current = render;

    // Create boundaries
    const thickness = 200;
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness/2, window.innerWidth * 2, thickness, { isStatic: true, render: { fillStyle: 'transparent' } });
    const leftWall = Bodies.rectangle(-thickness/2, window.innerHeight / 2, thickness, window.innerHeight * 2, { isStatic: true, render: { fillStyle: 'transparent' } });
    const rightWall = Bodies.rectangle(window.innerWidth + thickness/2, window.innerHeight / 2, thickness, window.innerHeight * 2, { isStatic: true, render: { fillStyle: 'transparent' } });

    // Create falling shapes
    const shapes = [];
    const colors = ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#ffffff'];
    
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * window.innerWidth;
      const y = -Math.random() * 1500 - 100;
      const size = 20 + Math.random() * 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const type = Math.random();
      const options = {
        restitution: 0.8,
        friction: 0.1,
        density: 0.05,
        render: {
          fillStyle: color,
          strokeStyle: 'rgba(255,255,255,0.1)',
          lineWidth: 2
        }
      };

      if (type < 0.33) {
        shapes.push(Bodies.circle(x, y, size, options));
      } else if (type < 0.66) {
        shapes.push(Bodies.rectangle(x, y, size * 1.5, size, { ...options, chamfer: { radius: 10 } }));
      } else {
        shapes.push(Bodies.polygon(x, y, Math.floor(Math.random() * 4) + 3, size, options));
      }
    }

    World.add(engine.world, [ground, leftWall, rightWall, ...shapes]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    World.add(engine.world, mouseConstraint);

    render.mouse = mouse; // keep mouse in sync with render

    // Run Engine and Render
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Handle Window Resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + thickness/2 });
      Matter.Body.setPosition(rightWall, { x: window.innerWidth + thickness/2, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(renderRef.current);
      Runner.stop(runnerRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world);
        Engine.clear(engineRef.current);
      }
      if (renderRef.current) {
        renderRef.current.canvas.remove();
        renderRef.current.canvas = null;
        renderRef.current.context = null;
        renderRef.current.textures = {};
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Physics Canvas Container */}
      <div 
        ref={sceneRef} 
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
      />
      
      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-[12rem] font-black text-white/5 tracking-tighter mix-blend-overlay select-none leading-none">
          404
        </h1>
        <p className="mt-4 text-2xl text-zinc-400 font-medium tracking-wide">
          Page Not Found
        </p>
        <p className="mt-2 text-zinc-500 max-w-md text-center">
          The page you are looking for doesn't exist or has been moved. You can play with the shapes or head back home.
        </p>
        <Link 
          to="/" 
          className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 pointer-events-auto shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
