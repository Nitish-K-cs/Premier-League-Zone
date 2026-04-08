package com.ipl.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeamAndPosition(String teamName, String position) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam().equalsIgnoreCase(teamName) && player.getPos().equalsIgnoreCase(position))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersFromTeam(String teamName) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam().equalsIgnoreCase(teamName))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByPosition(String position) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPos().equalsIgnoreCase(position))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByNation(String nation) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation().equalsIgnoreCase(nation))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existingPlayerOpt = playerRepository.findByName(updatedPlayer.getName());

        if(existingPlayerOpt.isPresent()) {
            Player existingPlayer = existingPlayerOpt.get();
            existingPlayer.setName(updatedPlayer.getName());
            existingPlayer.setNation(updatedPlayer.getNation());
            existingPlayer.setPos(updatedPlayer.getPos());
            existingPlayer.setTeam(updatedPlayer.getTeam());
            //existingPlayer.setAge(updatedPlayer.getAge());
            // existingPlayer.setMp(updatedPlayer.getMp());
            // existingPlayer.setStarts(updatedPlayer.getStarts());
            // existingPlayer.setMin(updatedPlayer.getMin());
            // existingPlayer.setGls(updatedPlayer.getGls());
            // existingPlayer.setAst(updatedPlayer.getAst());
            // existingPlayer.setPk(updatedPlayer.getPk());
            // existingPlayer.setCrdy(updatedPlayer.getCrdy());
            // existingPlayer.setCrdr(updatedPlayer.getCrdr());
            // existingPlayer.setXg(updatedPlayer.getXg());
            // existingPlayer.setXag(updatedPlayer.getXag());
            // existingPlayer.setTeam(updatedPlayer.getTeam());

            playerRepository.save(existingPlayer);
            return existingPlayer;
        } else {
            throw new RuntimeException("Player not found: " + updatedPlayer.getName());
        }
    }

    @Transactional
    public void deletePlayer(String playerName) {
         playerRepository.deleteByName(playerName);
    }
}



