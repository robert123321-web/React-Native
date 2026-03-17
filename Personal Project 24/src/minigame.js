import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AppContext } from "./appContext";
import Card from "./card";

export default function MiniGame() {
  const { theme } = useContext(AppContext);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [tiles, setTiles] = useState([]);
  const [nextTileIndex, setNextTileIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  // Color palette for tiles
  const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#22c55e", "#14b8a6"];

  useEffect(() => {
    if (gameActive && gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameActive, gameStarted]);

  const generateTiles = () => {
    const numTiles = Math.min(4 + level, 9);
    const newTiles = Array.from({ length: numTiles }, (_, i) => ({
      id: i,
      number: i + 1,
      color: colors[i % colors.length],
      tapped: false
    }));
    
    // Shuffle tiles
    for (let i = newTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    }
    
    setTiles(newTiles);
    setNextTileIndex(0);
  };

  const startGame = () => {
    setGameActive(true);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    generateTiles();
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    if (score > bestScore) {
      setBestScore(score);
    }
  };

  const handleTileTap = (id, number) => {
    if (!gameActive || gameOver) return;

    const expectedNumber = nextTileIndex + 1;

    if (number === expectedNumber) {
      // Correct tile tapped
      const newTiles = tiles.map((tile) =>
        tile.id === id ? { ...tile, tapped: true } : tile
      );
      setTiles(newTiles);

      if (nextTileIndex + 1 === tiles.length) {
        // Level complete!
        setScore((prev) => prev + tiles.length * level * 10);
        setLevel((prev) => prev + 1);
        setTimeout(() => {
          generateTiles();
        }, 500);
      } else {
        setNextTileIndex((prev) => prev + 1);
        setScore((prev) => prev + level * 10);
      }
    } else {
      // Wrong tile tapped - game over
      endGame();
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setTiles([]);
    setNextTileIndex(0);
    setTimeLeft(30);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Game Stats */}
      <View style={styles.statsRow}>
        <Card>
          <View style={styles.statBox}>
            <Text style={[styles.statLabel, { color: theme.text }]}>Score</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>{score}</Text>
          </View>
        </Card>
        <Card>
          <View style={styles.statBox}>
            <Text style={[styles.statLabel, { color: theme.text }]}>Level</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>{level}</Text>
          </View>
        </Card>
        <Card>
          <View style={styles.statBox}>
            <Text style={[styles.statLabel, { color: theme.text }]}>Best</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>{bestScore}</Text>
          </View>
        </Card>
      </View>

      {/* Time/Instructions */}
      {gameActive && gameStarted && (
        <Card>
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, { color: theme.text }]}>
              Time Left: 
            </Text>
            <Text style={[
              styles.timerValue,
              { 
                color: timeLeft <= 10 ? "#ef4444" : theme.primary
              }
            ]}>
              {timeLeft}s
            </Text>
          </View>
        </Card>
      )}

      {/* Game Instructions */}
      {!gameStarted && (
        <Card>
          <Text style={[styles.title, { color: theme.text }]}>
            🎮 Tap the Tiles
          </Text>
          <Text style={[styles.instructions, { color: theme.text }]}>
            Tap the numbered tiles in order from 1 to the highest number. Each level gets harder with more tiles!
          </Text>
          <Text style={[styles.instructionsSubtitle, { color: theme.text }]}>
            • You have 30 seconds{"\n"}
            • Tap wrong tile = Game Over{"\n"}
            • Correct taps = +10 points per level{"\n"}
            • Complete a level = +tiles×level×10 bonus
          </Text>
        </Card>
      )}

      {/* Game Board */}
      {gameStarted && (
        <Card>
          <View style={styles.gameBoard}>
            {tiles.map((tile) => (
              <TouchableOpacity
                key={tile.id}
                style={[
                  styles.tile,
                  {
                    backgroundColor: tile.tapped ? "#64748b" : tile.color,
                    opacity: tile.tapped ? 0.3 : 1
                  }
                ]}
                onPress={() => handleTileTap(tile.id, tile.number)}
                disabled={tile.tapped || gameOver}
              >
                <Text style={[styles.tileNumber, { opacity: tile.tapped ? 0.3 : 1 }]}>
                  {tile.number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {gameActive && (
            <View style={styles.nextTileHint}>
              <Text style={[styles.hintText, { color: theme.text }]}>
                Next: Tap 
                <Text style={[styles.hintNumber, { color: theme.primary }]}>
                  {" "}{nextTileIndex + 1}
                </Text>
              </Text>
            </View>
          )}
        </Card>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <Card>
          <View style={styles.gameOverContainer}>
            <Text style={[styles.gameOverTitle, { color: "#ef4444" }]}>
              GAME OVER! 😅
            </Text>
            <View style={styles.gameOverStats}>
              <View style={styles.gameOverStat}>
                <Text style={[styles.gameOverLabel, { color: theme.text }]}>Final Score</Text>
                <Text style={[styles.gameOverValue, { color: theme.primary }]}>{score}</Text>
              </View>
              <View style={styles.gameOverStat}>
                <Text style={[styles.gameOverLabel, { color: theme.text }]}>Reached Level</Text>
                <Text style={[styles.gameOverValue, { color: theme.primary }]}>{level}</Text>
              </View>
            </View>
          </View>
        </Card>
      )}

      {/* Buttons */}
      {!gameStarted ? (
        <Card>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={startGame}
          >
            <Text style={styles.buttonText}>🎮 Start Game</Text>
          </TouchableOpacity>
        </Card>
      ) : gameOver ? (
        <View style={styles.gameOverButtons}>
          <Card>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={startGame}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </Card>
          <Card>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#64748b" }]}
              onPress={resetGame}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </Card>
        </View>
      ) : (
        <Card>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ef4444" }]}
            onPress={endGame}
          >
            <Text style={styles.buttonText}>Give Up</Text>
          </TouchableOpacity>
        </Card>
      )}

      {/* Tips Card */}
      {!gameStarted && (
        <Card>
          <Text style={[styles.tipsTitle, { color: theme.text }]}>💡 Tips</Text>
          <Text style={[styles.tipsText, { color: theme.text }]}>
            • Focus and remember the positions of each number{"\n"}
            • Work as fast as you can - every second counts!{"\n"}
            • Your score multiplies with level difficulty{"\n"}
            • Try to reach level 5+!
          </Text>
        </Card>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800"
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15
  },
  timerText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10
  },
  timerValue: {
    fontSize: 28,
    fontWeight: "800"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 15
  },
  instructions: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    fontWeight: "500"
  },
  instructionsSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
    opacity: 0.8
  },
  gameBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 20
  },
  tile: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  tileNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff"
  },
  nextTileHint: {
    paddingVertical: 15,
    alignItems: "center"
  },
  hintText: {
    fontSize: 16,
    fontWeight: "600"
  },
  hintNumber: {
    fontSize: 20,
    fontWeight: "800"
  },
  gameOverContainer: {
    paddingVertical: 20,
    alignItems: "center"
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20
  },
  gameOverStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  gameOverStat: {
    alignItems: "center"
  },
  gameOverLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5
  },
  gameOverValue: {
    fontSize: 28,
    fontWeight: "800"
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  },
  gameOverButtons: {
    gap: 10
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10
  },
  tipsText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400"
  }
});
