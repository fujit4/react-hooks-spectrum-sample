import React from "react";
import { Image, Heading, View, Flex, Text} from '@adobe/react-spectrum';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <View>
      <Flex direction="row" justifyContent="center">
        <Heading level="4">{movie.Title}</Heading>
      </Flex>
      <View>
        <Image
          height="size-1600"
          objectFit="contain"
          alt={`The movie title: ${movie.TItle}`}
          src={poster}
        />
      </View>
      <Flex direction="row" justifyContent="center">
        <Text>({movie.Year})</Text>
      </Flex>
    </View>
  );
};

export default Movie;
