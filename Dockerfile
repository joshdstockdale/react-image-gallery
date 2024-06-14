FROM gcr.io/google_appengine/nodejs
WORKDIR /
ADD . .
RUN npm install
EXPOSE 5000
RUN npm run build
CMD ["npm", "run", "serve"]