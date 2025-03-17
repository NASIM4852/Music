import { useState, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const songs = [
  { id: 1, title: "Song One", category: "Pop", url: "song1.mp3" },
  { id: 2, title: "Song Two", category: "Rock", url: "song2.mp3" },
  { id: 3, title: "Song Three", category: "Jazz", url: "song3.mp3" },
];

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [search, setSearch] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const audioRef = useRef(new Audio(currentSong.url));

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    audioRef.current.src = songs[nextIndex].url;
    if (isPlaying) audioRef.current.play();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredSongs(songs.filter((song) => song.title.toLowerCase().includes(query)));
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  return (
    <Card className="p-4 w-96 mx-auto text-center">
      <h2 className="text-xl font-bold mb-2">Music Player</h2>
      <div className="flex items-center mb-2">
        <Search className="mr-2" />
        <Input
          placeholder="Search Songs..."
          value={search}
          onChange={handleSearch}
          className="flex-1"
        />
      </div>
      <CardContent>
        <h3 className="text-lg font-semibold">{currentSong.title}</h3>
        <p className="text-sm text-gray-500">{currentSong.category}</p>
        <div className="flex flex-col mt-4">
          <ul className="text-left">
            {filteredSongs.map((song) => (
              <li
                key={song.id}
                className={`cursor-pointer p-1 ${song.id === currentSong.id ? "font-bold" : ""}`}
                onClick={() => {
                  setCurrentSong(song);
                  audioRef.current.src = song.url;
                  if (isPlaying) audioRef.current.play();
                }}
              >
                {song.title} - {song.category}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</Button>
          <Button onClick={skipSong}><SkipForward /></Button>
          <Input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={changeVolume}
            className="w-24"
          />
          <Volume2 />
        </div>
      </CardContent>
    </Card>
  );
}
