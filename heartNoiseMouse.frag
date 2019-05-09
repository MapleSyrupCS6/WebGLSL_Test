
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

vec2 random2(vec2 p){
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))))*43758.5453);
}

float linearstep(float begin, float end, float t) {
    return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

float heart(vec2 st){

//位置とか形の調整
  st = (st-vec2(0.8, 0.38))*vec2(1.9, 2.6);
  float h = pow(st.x, 2.2)+pow(st.y - sqrt(abs(st.x)),1.8);

  return h;

}


float anim1(vec2 st, vec2 m){

    float x = 2.*st.y;
    m = m - 0.5;

    st.x += (m.x*0.3*sin(10.*x)*(-(x-1.)*(x-1.)+1.));

    float a = st.x;
    a = heart(st);
    return a;

}



void main() {
	vec2 uv = gl_FragCoord.xy / min(resolution.x, resolution.y);
  vec2 st = uv;

  vec3 c1 = vec3(0.9, 0.2, 0.3);
  vec3 c2 = vec3(0.2, 0.3, 0.9);
  // vec3 color = vec3(mix(c1, c2, smoothstep(0.9, 0.92, heart(st))));

  float m = length(mouse -st.x);

  float a = anim1(st, mouse);
  vec3 color = vec3(mix(c1, c2, smoothstep(0.9, 0.92, a)));

  vec3 filt = mix(c2, c1, step(mouse.y, st.y));

color += filt;


    gl_FragColor = vec4(color, 1.0);
}
